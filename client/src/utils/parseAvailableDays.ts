export function parseAvailableDays(days: string[]) {
  let disabledDays: number[] = [];

  days.forEach((day) => {
    switch (day) {
      case 'Sunday':
        disabledDays.push(0);
        break;
      case 'Monday':
        disabledDays.push(1);
        break;
      case 'Tuesday':
        disabledDays.push(2);
        break;
      case 'Wednesday':
        disabledDays.push(3);
        break;
      case 'Thursday':
        disabledDays.push(4);
        break;
      case 'Friday':
        disabledDays.push(5);
        break;
      case 'Saturday':
        disabledDays.push(6);
        break;

      default:
        break;
    }
  });

  disabledDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (num) => !disabledDays.includes(num)
  );

  return disabledDays;
}
