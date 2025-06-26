export interface ClassTalent {
  name: string;
  description: string;
  level: number;
}

export const CLASS_TALENTS: Record<string, ClassTalent[]> = {
  fighter: [
    {
      name: 'Второе дыхание',
      description: 'Раз в короткий отдых восстановите 1к10 + уровень бойца хитов.',
      level: 1,
    },
    {
      name: 'Действие рывка',
      description: 'Получите дополнительное действие один раз за короткий отдых.',
      level: 2,
    },
  ],
  wizard: [
    {
      name: 'Магические традиции',
      description: 'Выберите школу магии, получая уникальные способности.',
      level: 2,
    },
    {
      name: 'Возврат заклинания',
      description: 'Раз в длинный отдых восстанавливайте один слот 3 уровня.',
      level: 5,
    },
  ],
  rogue: [
    {
      name: 'Скрытность',
      description: 'Вы можете прятаться за половинное укрытие.',
      level: 2,
    },
    {
      name: 'Уклонение',
      description: 'Получаете половину урона при успешном спасброске ловкости.',
      level: 7,
    },
  ],
};
