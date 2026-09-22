import type { StreamDockModelDefinition } from './list.js'

/**
 * Stream Dock N1 (sold as Mirabox N1, VSDinside N1, TreasLin N1, ActionRing N1).
 *
 * Portrait "numeric keypad" form factor:
 *   - 15 LCD keys in a 3 wide x 5 tall grid (rows 1-5 here), 64x64 each
 *   - 2 non-LCD buttons and 1 rotary encoder with push, along the top (row 0)
 *
 * Like the rest of the 0x5548 devices, this one boots emulating a keyboard and
 * reports nothing on interface 0 until it is switched into software mode with
 * MOD (see StreamDock.setSoftwareMode). Without that, Companion sees a device
 * that accepts commands but never reports a press.
 *
 * Requested in bitfocus/companion-surface-mirabox-stream-dock#25, #30 and #61.
 *
 * Measured against hardware (serial 0841DA78170E): the input ids below, the
 * output ids mapping in reading order, 64x64 key images and an upright icon
 * rotation are all confirmed. Note the non-LCD buttons do NOT use the
 * 0x25/0x30/0x31 ids that the N3 and M18V3 use.
 *
 * #61 describes an LCD strip on this model. Writing to ids 0x10-0x15 produced
 * nothing on the unit tested and left the panel blank until it was reset, so no
 * strip outputs are defined here.
 */
export const N1Definition: StreamDockModelDefinition = {
	productName: 'Stream Dock N1',
	iconRotation: 0,
	requiresSoftwareMode: true,
	usbIds: [
		{
			// Enumerates as "HOTSPOTEKUSB HID DEMO" with a 12 character hex serial
			vendorId: 0x5548,
			productIds: [0x1002],
		},
	],

	inputs: [
		// Top row: the two non-LCD buttons and the rotary encoder.
		// Ids measured on hardware (serial 0841DA78170E); this model does not use
		// the 0x25/0x30/0x31 ids the N3 and M18V3 use for their non-LCD buttons.
		{
			type: 'button',
			id: 0x1e,
			row: 0,
			column: 0,
			name: 'Button 16',
		},
		{
			type: 'button',
			id: 0x1f,
			row: 0,
			column: 1,
			name: 'Button 17',
		},
		{
			type: 'button',
			id: 0x23,
			row: 0,
			column: 2,
			name: 'Rotary encoder 1',
		},
		// The encoder reports a single event per detent, with no press/release pair
		{
			type: 'rotateLeft',
			id: 0x32,
			row: 0,
			column: 2,
			name: 'Rotary encoder 1',
		},
		{
			type: 'rotateRight',
			id: 0x33,
			row: 0,
			column: 2,
			name: 'Rotary encoder 1',
		},

		// The 3x5 LCD key grid, ids 0x01-0x0f in reading order
		{
			type: 'button',
			id: 0x01,
			row: 1,
			column: 0,
			name: 'Button 1',
		},
		{
			type: 'button',
			id: 0x02,
			row: 1,
			column: 1,
			name: 'Button 2',
		},
		{
			type: 'button',
			id: 0x03,
			row: 1,
			column: 2,
			name: 'Button 3',
		},
		{
			type: 'button',
			id: 0x04,
			row: 2,
			column: 0,
			name: 'Button 4',
		},
		{
			type: 'button',
			id: 0x05,
			row: 2,
			column: 1,
			name: 'Button 5',
		},
		{
			type: 'button',
			id: 0x06,
			row: 2,
			column: 2,
			name: 'Button 6',
		},
		{
			type: 'button',
			id: 0x07,
			row: 3,
			column: 0,
			name: 'Button 7',
		},
		{
			type: 'button',
			id: 0x08,
			row: 3,
			column: 1,
			name: 'Button 8',
		},
		{
			type: 'button',
			id: 0x09,
			row: 3,
			column: 2,
			name: 'Button 9',
		},
		{
			type: 'button',
			id: 0x0a,
			row: 4,
			column: 0,
			name: 'Button 10',
		},
		{
			type: 'button',
			id: 0x0b,
			row: 4,
			column: 1,
			name: 'Button 11',
		},
		{
			type: 'button',
			id: 0x0c,
			row: 4,
			column: 2,
			name: 'Button 12',
		},
		{
			type: 'button',
			id: 0x0d,
			row: 5,
			column: 0,
			name: 'Button 13',
		},
		{
			type: 'button',
			id: 0x0e,
			row: 5,
			column: 1,
			name: 'Button 14',
		},
		{
			type: 'button',
			id: 0x0f,
			row: 5,
			column: 2,
			name: 'Button 15',
		},
	],
	outputs: [
		// The 3x5 LCD key grid
		{
			type: 'lcd',
			id: 0x01,
			row: 1,
			column: 0,
			name: 'LCD 1',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x02,
			row: 1,
			column: 1,
			name: 'LCD 2',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x03,
			row: 1,
			column: 2,
			name: 'LCD 3',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x04,
			row: 2,
			column: 0,
			name: 'LCD 4',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x05,
			row: 2,
			column: 1,
			name: 'LCD 5',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x06,
			row: 2,
			column: 2,
			name: 'LCD 6',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x07,
			row: 3,
			column: 0,
			name: 'LCD 7',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x08,
			row: 3,
			column: 1,
			name: 'LCD 8',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x09,
			row: 3,
			column: 2,
			name: 'LCD 9',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x0a,
			row: 4,
			column: 0,
			name: 'LCD 10',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x0b,
			row: 4,
			column: 1,
			name: 'LCD 11',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x0c,
			row: 4,
			column: 2,
			name: 'LCD 12',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x0d,
			row: 5,
			column: 0,
			name: 'LCD 13',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x0e,
			row: 5,
			column: 1,
			name: 'LCD 14',
			resolutionx: 64,
			resolutiony: 64,
		},
		{
			type: 'lcd',
			id: 0x0f,
			row: 5,
			column: 2,
			name: 'LCD 15',
			resolutionx: 64,
			resolutiony: 64,
		},
	],
}
