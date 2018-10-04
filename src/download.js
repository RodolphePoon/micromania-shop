
import { convertArrayToCSV } from 'convert-array-to-csv';

export  function downloadCSV(array,name) {
        var data, filename, link;

        var csv = convertArrayToCSV(array)
        console.log('csv',csv)
        if (csv == null) return;

        filename = name || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

