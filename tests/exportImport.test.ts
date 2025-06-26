import { exportCharacters, importCharacters } from '../src/services/exportService';
import { DataInitializer } from '../src/utils/DataInitializer';

describe('character export/import', () => {
  const characters = DataInitializer.getInitialCharacters('5e');

  it('exports and imports JSON', async () => {
    const blob = exportCharacters(characters, 'json');
    const text = await blob.text();
    const file: File = { name: 'chars.json', text: async () => text } as any;
    const data = await importCharacters(file);
    expect(data[0].name).toBe(characters[0].name);
  });

  it('exports and imports CSV', async () => {
    const blob = exportCharacters(characters, 'csv');
    const text = await blob.text();
    const file: File = { name: 'chars.csv', text: async () => text } as any;
    const data = await importCharacters(file);
    expect(data[0].name).toBe(characters[0].name);
  });
});
