import type { StreamDockModelDefinition } from './list.js'

/**
 * Stream Dock N1 (sold as Mirabox N1, VSDinside N1, TreasLin N1, ActionRing N1).
 *
 * Portrait "numeric keypad" form factor:
 *   - 15 LCD keys in a 3 wide x 5 tall grid (rows 1-5 here)
 *   - 2 non-LCD buttons and 1 rotary encoder with push, along the top (row 0)
 *   - an LCD strip across the top, modelled as 3 output segments on row 0
 *
 * The 3x6 control grid matches the layout the vendor software itself uses: its
 * bundled N1 profiles (DeviceUUID "VSDN1") address keys as column 0-2 by row 0-5.
 *
 * Reported in bitfocus/companion-surface-mirabox-stream-dock#61, and also
 * requested in #25 and #30.
 *
 * TODO(hardware): the following still need to be confirmed against a physical
 * unit - every one of them is a per-model value in this family, so they cannot
 * be derived from the sibling models. Run `tools/probe-device.cjs` with the deck
 * attached to capture the input ids, then adjust:
 *   - input ids for the 15 LCD keys, the 2 buttons and the encoder
 *   - output ids for the LCD keys (the M18V3 and N4 map these bottom-up rather
 *     than in reading order, while the N3 maps them in reading order)
 *   - output ids and resolution of the LCD strip segments
 *   - LCD key resolution (siblings use 60x60, 64x64 and 112x112)
 *   - iconRotation
 */
export const N1Definition: StreamDockModelDefinition = {
	productName: 'Stream Dock N1',
	// TODO(hardware): verify - siblings in this family use 0, 90, 180, 270 and -90
	iconRotation: 0,
	usbIds: [
		{
			// Enumerates as "HOTSPOTEKUSB HID DEMO" with a 12 character hex serial
			vendorId: 0x5548,
			productIds: [0x1002],
		},
	],

	inputs: [
		// Top row: 2 non-LCD buttons and the rotary encoder.
		// 0x25/0x30 are the ids this family uses for its non-LCD buttons (see N3, M18V3),
		// and 0x35 + 0x50/0x51 is the first-encoder triple used by the N3 and N4.
		{
			type: 'button',
			id: 0x25,
			row: 0,
			column: 0,
			name: 'Button 1',
		},
		{
			type: 'button',
			id: 0x30,
			row: 0,
			column: 1,
			name: 'Button 2',
		},
		{
			type: 'push',
			id: 0x35,
			row: 0,
			column: 2,
			name: 'Rotary encoder 1',
		},
		{
			type: 'rotateLeft',
			id: 0x50,
			row: 0,
			column: 2,
			name: 'Rotary encoder 1',
		},
		{
			type: 'rotateRight',
			id: 0x51,
			row: 0,
			column: 2,
			name: 'Rotary encoder 1',
		},

		// LCD strip swipes, as on the N4
		{
			type: 'swipeLeft',
			id: 0x38,
			row: 0,
			column: 0,
			name: 'LCD Strip',
		},
		{
			type: 'swipeRight',
			id: 0x39,
			row: 0,
			column: 0,
			name: 'LCD Strip',
		},

		// The 3x5 LCD key grid
		{
			type: 'button',
			id: 0x01,
			row: 1,
			column: 0,
			name: 'Button 3',
		},
		{
			type: 'button',
			id: 0x02,
			row: 1,
			column: 1,
			name: 'Button 4',
		},
		{
			type: 'button',
			id: 0x03,
			row: 1,
			column: 2,
			name: 'Button 5',
		},
		{
			type: 'button',
			id: 0x04,
			row: 2,
			column: 0,
			name: 'Button 6',
		},
		{
			type: 'button',
			id: 0x05,
			row: 2,
			column: 1,
			name: 'Button 7',
		},
		{
			type: 'button',
			id: 0x06,
			row: 2,
			column: 2,
			name: 'Button 8',
		},
		{
			type: 'button',
			id: 0x07,
			row: 3,
			column: 0,
			name: 'Button 9',
		},
		{
			type: 'button',
			id: 0x08,
			row: 3,
			column: 1,
			name: 'Button 10',
		},
		{
			type: 'button',
			id: 0x09,
			row: 3,
			column: 2,
			name: 'Button 11',
		},
		{
			type: 'button',
			id: 0x0a,
			row: 4,
			column: 0,
			name: 'Button 12',
		},
		{
			type: 'button',
			id: 0x0b,
			row: 4,
			column: 1,
			name: 'Button 13',
		},
		{
			type: 'button',
			id: 0x0c,
			row: 4,
			column: 2,
			name: 'Button 14',
		},
		{
			type: 'button',
			id: 0x0d,
			row: 5,
			column: 0,
			name: 'Button 15',
		},
		{
			type: 'button',
			id: 0x0e,
			row: 5,
			column: 1,
			name: 'Button 16',
		},
		{
			type: 'button',
			id: 0x0f,
			row: 5,
			column: 2,
			name: 'Button 17',
		},
	],
	outputs: [
		// LCD strip segments across the top
		{
			type: 'lcd',
			id: 0x10,
			row: 0,
			column: 0,
			name: 'Strip 1',
			resolutionx: 176,
			resolutiony: 124,
		},
		{
			type: 'lcd',
			id: 0x11,
			row: 0,
			column: 1,
			name: 'Strip 2',
			resolutionx: 176,
			resolutiony: 124,
		},
		{
			type: 'lcd',
			id: 0x12,
			row: 0,
			column: 2,
			name: 'Strip 3',
			resolutionx: 176,
			resolutiony: 124,
		},

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
