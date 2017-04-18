export class ModelHelper {
    static fieldsCsv<T>(obj: T): string {
        let csv: string = '';
        for (let field in obj) {
            csv += field + ',';
        }
        return csv.slice(0, -1);
    }
}