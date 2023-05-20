import { describe, expect, test } from '@jest/globals';

import { prtDevModeFromHexValues } from '../src/binary-data-parser';

describe('convert binary printing device module data', () => {
  test('dummy test', () => {
    let hex_values = [
      '0x0000000020059319784c8e01184c8e01020200000e02120002020000bff99088',
      '0x010400069c0064034def8001010000019a0b3408640001000f00580202000100',
      '0x580203000100413400c37f68b44e8e0140e4e515180000000c000000a04e8e01',
      '0x544c8e01c8420000000000000000000000000000010000000000000001000000',
      '0x0200000001000000000000000000000000000000000000000000000050524956',
      '0xe230000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000180000000000102710271027',
      '0x0000102700000000000000008000540300000000000000000000000000000000',
      '0x0000000000000000030000000000000010001000503403002888040000000000',
      '0x0000000000000100000000000000000000000000000000004d311f1e04000000',
      '0x05000100ff00ff00000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0100000000000000000000000000000080000000534d544a0000000010007000',
      '0x650044006f0063005000720069006e007400500072006f0000005265736f6c75',
      '0x74696f6e00363030647069005061676553697a65004134005061676552656769',
      '0x6f6e00004c656164696e67456467650000000000000000000000000000000000',
      '0x00000000000000000000000000000000100000004450534d0100000000000000',
    ];
    expect(prtDevModeFromHexValues(hex_values)).toEqual({
      dmDeviceName: '',
      dmFormName: 'A4',
    });
  });
});
