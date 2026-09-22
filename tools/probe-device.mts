/**
 * Probe a Stream Dock device and report the raw input ids it sends.
 *
 * Adding a new model to src/models/ needs the per-control ids that the device
 * puts in byte 9 of its input reports. Those are model specific, so they have
 * to be read off the hardware. Run this with the device attached, press every
 * control in turn, and it prints the ids in the order you pressed them.
 *
 * Usage:
 *   yarn probe              # auto-detect a family device
 *   yarn probe 5548 1002    # or name vendor/product explicitly, in hex
 *
 * The vendor software must be fully closed first, or it will hold the device
 * open and this will see nothing.
 */
import HID from 'node-hid'
import { AllModels } from '../src/models/list.js'

const knownVendors = new Set(AllModels.flatMap((model) => model.usbIds.map((ids) => ids.vendorId)))

const hex = (value: number, width = 4): string => `0x${value.toString(16).padStart(width, '0')}`

const [vendorArg, productArg] = process.argv.slice(2)
const wantVendor = vendorArg ? parseInt(vendorArg, 16) : undefined
const wantProduct = productArg ? parseInt(productArg, 16) : undefined

const devices = HID.devices()
const candidates = devices.filter((device) => {
	if (wantVendor !== undefined) {
		return device.vendorId === wantVendor && (wantProduct === undefined || device.productId === wantProduct)
	}
	return knownVendors.has(device.vendorId)
})

if (candidates.length === 0) {
	console.log(`No matching device found among ${devices.length} HID devices.`)
	console.log('\nEverything currently visible:')
	for (const device of devices) {
		console.log(
			`  ${hex(device.vendorId)}:${hex(device.productId)}  ${device.manufacturer ?? '?'} / ${device.product ?? '?'}`,
		)
	}
	console.log('\nIf your device is missing: close the vendor software, then check the cable')
	console.log('carries data rather than power only.')
	process.exit(1)
}

console.log('Matching devices:')
for (const device of candidates) {
	console.log(`  ${hex(device.vendorId)}:${hex(device.productId)}  interface=${device.interface}`)
	console.log(`    ${device.manufacturer ?? '?'} / ${device.product ?? '?'}  serial=${device.serialNumber ?? '?'}`)
}

// Interface 0 is the one that carries the Stream Dock protocol
const target = candidates.find((device) => device.interface === 0) ?? candidates[0]
if (!target.path) {
	console.error('\nDevice has no usable path')
	process.exit(1)
}

const known = AllModels.find((model) =>
	model.usbIds.some((ids) => ids.vendorId === target.vendorId && ids.productIds.includes(target.productId)),
)
console.log(
	`\nProbing ${hex(target.vendorId)}:${hex(target.productId)} - ${known ? `already supported as "${known.productName}"` : 'not currently in AllModels'}`,
)
console.log('Press each control once, in the order you want them numbered.')
console.log('Press Ctrl-C when finished to print the summary.\n')

const device = await HID.HIDAsync.open(target.path)
const order: number[] = []

device.on('data', (data: Buffer) => {
	if (data.length < 11) return

	const id = data[9]
	const pressed = data[10] !== 0x00

	if (pressed && !order.includes(id)) {
		order.push(id)
		console.log(`  ${String(order.length).padStart(2)}. id=${hex(id, 2)}  press    <- new control`)
	} else {
		console.log(`      id=${hex(id, 2)}  ${pressed ? 'press' : 'release'}`)
	}
})
device.on('error', (error: Error) => console.error('HID error:', error.message))

process.on('SIGINT', () => {
	console.log('\n\nControl ids, in the order pressed:')
	order.forEach((id, index) => console.log(`  ${index + 1}: ${hex(id, 2)}`))
	console.log('\nUse these as the `id` values of the inputs in your model definition.')
	void device.close().then(() => process.exit(0))
})
