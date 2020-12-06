import source from '../models/source';

export const tran = async(req, res) => {
    const {code} = req.body;
    const findOne = (x) => {
        for (var y = 0; y <= source.arabic_code.length; y++)
        {
            if (x === source.arabic_code[y]){
                return y;
            }
        }
    }

    try{
        const codeArray = code.split('');
        let codeBuilder = "",tran = "",err1 = '', err2 = '', err3 = '', issue = `${err1 + "\n" + err2 + '\n' + err3}`;
        for(var x = 0; x < codeArray.length; x++){
            codeBuilder = `${codeBuilder + codeArray[x]}`;
            switch (codeArray[x]){
                case '{':
                    err1 = `. يتوقع وجود "}" في انتهاء اي ميثود أو كائن`;
                    break;
                case '}':
                    err1 = '';
                    break;
                case '(':
                    err2 = '. يتوقع وجود ")" بعد الانتهاء من اسناد القيم للباراميترات في الدوال';
                    break;
                case ')':
                    err2 = '';
                    break;
            }
            const find = findOne(codeBuilder)
            if (!find) {continue} else {tran = `${tran + source.javaScript_code[find]}`; codeBuilder = '';}
            }  
        res.status(200).json({message:tran, error:`${err1+err2+err3}`});
        console.log(codeArray);
    }catch (e) {
    }
}

