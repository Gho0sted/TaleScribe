import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import { Character } from '../types';
import { validateCharacter } from '../utils/validation';

export type ExportFormat = 'json' | 'markdown' | 'csv' | 'pdf';

function createBlob(parts: BlobPart[], type: string): Blob {
  const blob = new Blob(parts, { type });
  if (typeof (blob as any).text !== 'function') {
    (blob as any).text = async () => {
      const buffer = await blob.arrayBuffer();
      return new TextDecoder().decode(buffer);
    };
  }
  return blob;
}

export function exportCharacters(
  characters: Character[],
  format: ExportFormat,
): Blob {
  switch (format) {
    case 'json':
      return createBlob([JSON.stringify(characters, null, 2)], 'application/json');
    case 'csv': {
      const csv = Papa.unparse(characters);
      return createBlob([csv], 'text/csv');
    }
    case 'markdown': {
      const headers = ['Name', 'Class', 'Race', 'Level', 'HP', 'AC'];
      let md = `| ${headers.join(' | ')} |\n`;
      md += `| ${headers.map(() => '---').join(' | ')} |\n`;
      characters.forEach((c) => {
        md += `| ${c.name} | ${c.class} | ${c.race} | ${c.level} | ${c.hitPoints.current}/${c.hitPoints.max} | ${c.armorClass} |\n`;
      });
      return createBlob([md], 'text/markdown');
    }
    case 'pdf': {
      const doc = new jsPDF();
      doc.text('Characters', 10, 10);
      characters.forEach((c, i) => {
        doc.text(`${c.name} (${c.class} ${c.level})`, 10, 20 + i * 10);
      });
      const blob = doc.output('blob');
      return createBlob([blob], 'application/pdf');
    }
  }
}

export async function importCharacters(file: File): Promise<Character[]> {
  const ext = file.name.split('.').pop()?.toLowerCase();
  const text = await file.text();
  let data: Record<string, unknown>[] = [];
  try {
    switch (ext) {
      case 'json':
        data = JSON.parse(text);
        break;
      case 'csv':
        data = Papa.parse(text, { header: true }).data as Record<string, unknown>[];
        break;
      case 'md':
      case 'markdown': {
        const lines = text.trim().split('\n').slice(2);
        data = lines.map((l) => {
          const [name, cls, race, level] = l
            .split('|')
            .map((c) => c.trim())
            .filter(Boolean);
          return {
            id: Date.now().toString(),
            name,
            class: cls,
            race,
            level: Number(level),
          };
        });
        break;
      }
      case 'pdf':
        // PDF parsing not supported in this demo
        data = [];
        break;
    }
  } catch (e) {
    console.error('Import error', e);
  }
  return data.filter((c) => validateCharacter(c));
}

export function exportToFoundry(
  type: 'monsters' | 'characters',
  items: any[],
): Blob {
  const payload = items.map((c) => ({
    name: c.name,
    type: type === 'characters' ? 'character' : 'npc',
    token: { name: c.name, img: c.avatar || '', vision: true },
    data: {
      abilities: c.abilityScores,
      attributes: {
        ac: c.armorClass,
        hp: { value: c.hitPoints?.current, max: c.hitPoints?.max },
        level: c.level,
      },
    },
    items: (c.inventory || []).map((i: any) => ({
      name: i.name,
      type: i.type,
      data: { description: i.description },
    })),
  }));
  return createBlob([JSON.stringify(payload, null, 2)], 'application/json');
}
