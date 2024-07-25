document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/prontuario";
  
    const especialidadeElem = document.querySelector(".linha-01 p:nth-child(1)");
    const consultaNumeroElem = document.querySelector(".linha-01 p:nth-child(2)");
    const diagnosticoInput = document.querySelector(".linha-02 input.caixa-texto-01");
    const medicacaoInput = document.querySelector(".linha-02 input.caixa-texto-02");
    const botaoEditar = document.querySelector(".botao_editar");
  
    let isEditing = false;
  
    function fetchProntuario() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          especialidadeElem.innerText = data.especialidade;
          consultaNumeroElem.innerText = `Consulta n. ${data.consultaNumero}`;
          diagnosticoInput.value = data.diagnostico;
          medicacaoInput.value = data.medicacao;
  
          diagnosticoInput.disabled = true;
          medicacaoInput.disabled = true;
        })
        .catch(error => console.error('Error:', error));
    }
  
    botaoEditar.addEventListener("click", () => {
      if (isEditing) {
        const updatedProntuario = {
          especialidade: especialidadeElem.innerText,
          consultaNumero: parseInt(consultaNumeroElem.innerText.split(" ")[2], 10),
          diagnostico: diagnosticoInput.value,
          medicacao: medicacaoInput.value
        };
  
        fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProntuario)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert("Prontuário atualizado com sucesso!");
  
            diagnosticoInput.disabled = true;
            medicacaoInput.disabled = true;
            botaoEditar.innerText = "Editar prontuário";
            isEditing = false;
          })
          .catch(error => console.error('Error:', error));
      } else {
        diagnosticoInput.disabled = false;
        medicacaoInput.disabled = false;
        botaoEditar.innerText = "Salvar prontuário";
        isEditing = true;
      }
    });
  
    fetchProntuario();
  });
  

// document.addEventListener("DOMContentLoaded", () => {
//     const apiUrl = "http://localhost:3000/prontuario";
//     const prontuarioUrl = "http://localhost:3000/ultimo-prontuario";
  
//     const nomePacienteElem = document.querySelector(".dados_linha p:nth-child(1)");
//     const especialidadeElem = document.querySelector(".dados_linha p:nth-child(2)");
//     const nomeMedicoElem = document.querySelector(".dados_linha p:nth-child(3)");
//     const dataConsultaElem = document.querySelector(".dados_linha p:nth-child(4)");
//     const botaoDetalhes = document.querySelector(".botao_detalhes");
//     const botaoProntuario = document.querySelector(".botao_prontuario");
  
//     let isEditing = false;
  
//     function fetchProntuario() {
//       fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//           nomePacienteElem.innerText = data.nomePaciente;
//           especialidadeElem.innerText = data.especialidade;
//           nomeMedicoElem.innerText = data.nomeMedico;
//           dataConsultaElem.innerText = data.dataConsulta;
//         })
//         .catch(error => console.error('Error:', error));
//     }
  
//     function openModal() {
//       fetch(prontuarioUrl)
//         .then(response => response.text())
//         .then(html => {
//           const modal = document.createElement("div");
//           modal.innerHTML = html;
//           document.body.appendChild(modal);
  
//           const closeButton = modal.querySelector(".close-modal");
//           closeButton.addEventListener("click", () => {
//             document.body.removeChild(modal);
//           });
//         })
//         .catch(error => console.error('Error:', error));
//     }
  
//     botaoDetalhes.addEventListener("click", () => {
//       if (isEditing) {
//         const updatedProntuario = {
//           nomePaciente: nomePacienteElem.innerText,
//           especialidade: especialidadeElem.innerText,
//           nomeMedico: nomeMedicoElem.innerText,
//           dataConsulta: dataConsultaElem.innerText
//         };
  
//         fetch(apiUrl, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(updatedProntuario)
//         })
//           .then(response => response.json())
//           .then(data => {
//             console.log('Success:', data);
//             alert("Prontuário atualizado com sucesso!");
//             botaoDetalhes.innerText = "Detalhes";
//             isEditing = false;
//           })
//           .catch(error => console.error('Error:', error));
//       } else {
//         botaoDetalhes.innerText = "Salvar";
//         isEditing = true;
//       }
//     });
  
//     botaoProntuario.addEventListener("click", openModal);
  
//     fetchProntuario();
//   });
  

// document.addEventListener("DOMContentLoaded", () => {
//     const apiUrl = "http://localhost:3000/";
//     const prontuarioUrl = "http://localhost:3000/";
  
//     const nomePacienteElem = document.querySelector("#nomePaciente");
//     const especialidadeElem = document.querySelector("#especialidade");
//     const consultaNumeroElem = document.querySelector("#consultaNumero");
//     const diagnosticoInput = document.querySelector("#diagnostico");
//     const medicacaoInput = document.querySelector("#medicacao");
//     const botaoDetalhes = document.querySelector(".botao_detalhes");
//     const botaoProntuario = document.querySelector(".botao_prontuario");
//     const botaoEditar = document.querySelector(".botao_editar");
//     const editarProntuarioDiv = document.querySelector(".editar-protuario");
  
//     let isEditing = false;
  
//     function fetchProntuario() {
//       fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//           nomePacienteElem.innerText = data.nomePaciente;
//           especialidadeElem.innerText = data.especialidade;
//           consultaNumeroElem.innerText = `Consulta n. ${data.consultaNumero}`;
//           diagnosticoInput.value = data.diagnostico;
//           medicacaoInput.value = data.medicacao;
  
//           diagnosticoInput.disabled = true;
//           medicacaoInput.disabled = true;
//         })
//         .catch(error => console.error('Error:', error));
//     }
  
//     botaoDetalhes.addEventListener("click", () => {
//       editarProntuarioDiv.style.display = editarProntuarioDiv.style.display === "none" ? "block" : "none";
//     });
  
//     botaoEditar.addEventListener("click", () => {
//       if (isEditing) {
//         const updatedProntuario = {
//           especialidade: especialidadeElem.innerText,
//           consultaNumero: parseInt(consultaNumeroElem.innerText.split(" ")[2], 10),
//           diagnostico: diagnosticoInput.value,
//           medicacao: medicacaoInput.value
//         };
  
//         fetch(apiUrl, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(updatedProntuario)
//         })
//           .then(response => response.json())
//           .then(data => {
//             console.log('Success:', data);
//             alert("Prontuário atualizado com sucesso!");
  
//             diagnosticoInput.disabled = true;
//             medicacaoInput.disabled = true;
//             botaoEditar.innerText = "Editar prontuário";
//             isEditing = false;
//           })
//           .catch(error => console.error('Error:', error));
//       } else {
//         diagnosticoInput.disabled = false;
//         medicacaoInput.disabled = false;
//         botaoEditar.innerText = "Salvar prontuário";
//         isEditing = true;
//       }
//     });
  
//     botaoProntuario.addEventListener("click", () => {
//       fetch(prontuarioUrl)
//         .then(response => response.text())
//         .then(html => {
//           const modal = document.createElement("div");
//           modal.innerHTML = html;
//           document.body.appendChild(modal);
  
//           const closeButton = modal.querySelector(".close-modal");
//           closeButton.addEventListener("click", () => {
//             document.body.removeChild(modal);
//           });
//         })
//         .catch(error => console.error('Error:', error));
//     });
  
//     fetchProntuario();
//   });
  