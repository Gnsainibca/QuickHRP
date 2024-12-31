export default class Utils {
    static getAge(date: Date): Array<number> {
        var todayDate = new Date();
        var ageyear = todayDate.getFullYear() - date.getFullYear();
        var ageMonth = todayDate.getMonth() - date.getMonth();
        var ageDay = todayDate.getDate() - date.getDate();

        if (ageMonth <= 0) {
            ageyear--;
            ageMonth = (12 + ageMonth);
        }
        if (todayDate < date) {
            ageMonth--;
            ageDay = 30 + ageDay;
        } if (ageMonth == 12) {
            ageyear = ageyear + 1;
            ageMonth = 0;
        }

        return [ageyear, ageMonth, ageDay];
    }
}