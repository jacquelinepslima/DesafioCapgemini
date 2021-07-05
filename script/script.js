
        const form = document.getElementById('investA');
        console.log(form.elements)
        function handleKeyUp(event) {
            console.log(event.target.value);
            return ('teste valor', +form.value)
        }
        form.addEventListener('change', handleKeyUp);

        console.log('teste form', +form.value)



        function receber() {
     
            formulario = (+form.value);
            let entrada = formulario;
            console.log('O que esta vindo', entrada)
            return entrada;

        }
        console.log('testando receber', receber());

        function calc() {

            entradaFunc = receber()
            const pessoasPorReal = entradaFunc * 30;
            const clicam = pessoasPorReal * 0.12;
            const compartilham = (clicam * (3 / 20));
            const visualiza = compartilham * 40;
            totalVisualizado = pessoasPorReal + visualiza;

            return totalVisualizado

        }
        function chamada() {
            document.getElementById('valorDigitado').innerHTML = `O total de pessoas que viram o mesmo anuncio a cada um real investido foi: ${calc()} pessoas.`;
        }


        function ListaAnuncio() {
            this.nome = 'doAnuncio';
            this.cliente = 'nomeCliente';
            this.inicio = 'dataInicio';
            this.fim = 'dataFim';
            this.investimento = 0;
        }
 /*======================================================================================================*/
        nomesAnuncios = []
        let aAnuncios =[];
        let aNomes =[];
        let aData1 =[];
        let aData2 =[];
        let aInvestimento =[];

        let caju =document.getElementsByName('anuncio').value;

        
        console.log("nomesAnuncios",nomesAnuncios)

        espacoAprender = new ListaAnuncio;
        espacoAprender.entrada=document.getElementsByName('[anuncio]').value;
        espacoAprender.nome =document.getElementsByName('[anuncio]').value;
        espacoAprender.cliente =document.getElementsByName('nome').value;
        espacoAprender.inicio =document.getElementsByName('dataIn').value;
        espacoAprender.fim=document.getElementsByName('dataFi').value;
        espacoAprender.investimento =document.getElementsByName('investA').value;
        console.log('teste caju',caju);






        function enviar() {
            let inserirAnuncio = document.getElementsByName('anuncio');
            if (!!inserirAnuncio) {
                nomesAnuncios.push(inserirAnuncio.value)
                console.log('nomesAnuncios',nomesAnuncios)
            }
            else {
                console.log('inserir valor')
            }
            //console.log('itens da lista', nomesAnuncios)

/*======================================================================================================*/
            const entrada =document.getElementById('anuncio');
            const anun = document.getElementById('anuncio');
            const nome = document.getElementById('nome');
            const dataI = document.getElementById('dataI');
            const dataF = document.getElementById('dataF');
            const grana = document.getElementById('grana');
            //console.log(forma.elements)
            function handleKeyUp(event) {
                console.log(event.target.value);
                return ('teste valor', event.target.value)
            }
            //console.log(forma)
            anun.addEventListener('change', handleKeyUp);
            nomesAnuncios.push(anun.value)
            console.log('teste forma teste', nomesAnuncios)
            console.log('ver quantidade da lista', nomesAnuncios.length)
            //nomesAnuncios[0] = new ListaAnuncio()
            let nome1 = anun.value;
            let cliente = nome.value;
            let inicio = dataI.value;
            let fim = dataF.value;
            let investimento = grana.value;

        
        
            
            aAnuncios.push(nome1);
            aNomes.push(cliente);
            aData1.push(inicio);
            aData2.push(fim);
            aInvestimento.push(investimento);
            console.log('ver quantidade da lista', nome.value)
            ListaAnuncios.push(aAnuncio)
            ListaAnuncio.push(aNomes)
            ListaAnuncio.push(aData1)
            ListaAnuncio.push(aData2)
            ListaAnuncio.push(aInvestimento)
            
        
        }
        //puxando dados
        console.log(ListaAnuncio)
