const sessoes= JSON.parse(localStorage.getItem("chave-veic")) || [];

mostrarDados()

function salvarCarro(){
    const tipo_veic=document.querySelector("#tipo-veic")
    const marca=document.querySelector("#marca")
    const placa=document.querySelector("#placa")
    const prop=document.querySelector("#prop")
    const data_entrada=document.querySelector("#data-entrada")
    const preco=document.querySelector("#preco")

    sessoes.push([tipo_veic.value, marca.value, placa.value,prop.value, data_entrada.value,"", preco.value])
    localStorage.setItem("chave-veic",JSON.stringify(sessoes))
    
    mostrarDados();
    limparForm();
}


function mostrarDados(){
    //limpar antes os tr da table e só depois preencher com os dados do array sessoes
    let tr_para_limpar=document.querySelectorAll(".dados")
    tr_para_limpar.forEach(element => {
    element.remove();
});

const tabela= document.querySelector("tbody")


for (const sessao of sessoes) {
            const tr=document.createElement("tr");
                  tr.setAttribute("class","dados")  
    sessao.forEach(dado => {
            const td=document.createElement("td");
                  td.innerText=dado;
                  tr.appendChild(td)
                 
       
    }
);

const tdAlterar =document.createElement("td")
tdAlterar.innerHTML='<img src="img/pencil.svg">'
tdAlterar.setAttribute("class","icon_alterar")
tdAlterar.setAttribute("onclick",`selRescrever(${sessoes.indexOf(sessao)})`)

const tdDeletar =document.createElement("td")
tdDeletar.innerHTML='<img src="img/trash.svg">'
tdDeletar.setAttribute("class","icon_apagar")
tdDeletar.setAttribute("onclick",`apagarSessao(${sessoes.indexOf(sessao)})`)

tr.appendChild(tdAlterar)
tr.appendChild(tdDeletar)
  tabela.appendChild(tr)


}
}
function limparForm(){
    document.querySelector("#tipo-veic").value=""
    document.querySelector("#marca").value=""
    document.querySelector("#placa").value=""
    document.querySelector("#prop").value=""
    document.querySelector("#data-entrada").value=""
    document.querySelector("#preco").value=""

}

function apagarSessao(posicao){
    sessoes.splice(posicao,1)
    localStorage.setItem("chave-veic",JSON.stringify(sessoes))
    mostrarDados()
    limparForm();
}


function selRescrever(posicao){
console.log(sessoes[posicao])

if(document.getElementById("btn-salvar").style.display=="none"){
    document.getElementById("label-data-saida").remove()
    document.getElementById("data-saida").remove()
    document.getElementById("btnRescrever").remove()
}


const btnSalvar= document.getElementById("btn-salvar")
      btnSalvar.style.display="none"

const Label_data_saida=document.createElement("label")
      Label_data_saida.setAttribute("for","data_saida")
      Label_data_saida.setAttribute("id","label-data-saida")
      Label_data_saida.innerText="Data de Saída:"

const data_saida=document.createElement("input")
      data_saida.setAttribute("type","datetime-local")
      data_saida.setAttribute("id","data-saida") 
      data_saida.style.color="white"
      data_saida.style.background="rgb(9, 210, 76)"


const btnRescrever=document.createElement("button")
      btnRescrever.setAttribute("class","btn")
      btnRescrever.setAttribute("id","btnRescrever")
      btnRescrever.innerText="reEscrever"
      btnRescrever.addEventListener("click", function alterarSessao(){
        
        sessoes[posicao]=([ document.querySelector("#tipo-veic").value,
                            document.querySelector("#marca").value,
                            document.querySelector("#placa").value,
                            document.querySelector("#prop").value,
                            document.querySelector("#data-entrada").value,
                            document.querySelector("#data-saida").value,
                            document.querySelector("#preco").value
                         ])
        localStorage.setItem("chave-veic",JSON.stringify(sessoes))
        mostrarDados()
        limparForm();
        btnRescrever.remove();
        data_saida.remove()
        Label_data_saida.remove()
        btnSalvar.style.display="block"

      })

const form=document.querySelector("form")
form.appendChild(btnRescrever)
form.insertBefore(data_saida,document.getElementById("lb-preco"))
form.insertBefore(Label_data_saida,data_saida)

document.querySelector("#tipo-veic").value=sessoes[posicao][0]
document.querySelector("#marca").value=sessoes[posicao][1]
document.querySelector("#placa").value=sessoes[posicao][2]
document.querySelector("#prop").value=sessoes[posicao][3]
document.querySelector("#data-entrada").value=sessoes[posicao][4]
document.querySelector("#data-saida").value=sessoes[posicao][5]
document.querySelector("#preco").value=sessoes[posicao][6]
}

