import * as fs from 'fs';

// console.log(fs)

export const readFile = (fileName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            }
            if (data) {
                resolve(data);
            }
        }
    });

});
export const writeFile = (fileName: string) => {
    


}


export const exists = () => {

}