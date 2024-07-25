 class Validacoes {
    static DataConvert(value) {
        if (value === null || typeof value !== 'string') {
            return null; // ou lançar um erro, dependendo do comportamento desejado
        }
        let [dia, mes, ano] = value.split('/'); 
        let dataFormatada = `${ano}-${mes}-${dia}`;
        const newDate = new Date(dataFormatada);
        return newDate;
    }
    
 }

 module.exports = Validacoes; 