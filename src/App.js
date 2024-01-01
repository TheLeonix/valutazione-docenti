import React, { useState, useEffect } from 'react';

function ValutazioneDocenti() {
  console.clear()
  const [docenti, setDocenti] = useState([]);
  // Robe Temporanee
  const utente = {
    classe: 'Classe4L',
  };
  // Fine RobeTemporanee
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/ProfJSON.json')
      .then(response => response.json())
      .then(data => {
        const docentiFiltrati = data.filter(docente => docente.materie[utente.classe]);
        setDocenti(docentiFiltrati);
      })
      .catch(error => console.error('Errore durante il recupero dei dati:', error));
  }, [utente.classe]);
  const setTrue = (docenteId) => {
    setDocenti((docentiAttuali) => {
      return docentiAttuali.map((docente) => {
        if (docente.nome === docenteId) {
          return { ...docente, valutato: true };
        }
        return docente;
      });
    });
  };
  const Test=(valutato,nome)=>{
    console.log("entrato")
    if(valutato===false)
    {
      return (
        <input type='button' value={"Valuta"} onClick={()=>setTrue(nome)}/>
      )
    }
    else
    {
      return(
      
          <div>Già Votato</div>
      )
    }
  }
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Valutazione Docenti</h1>

      <ul className="list-group">
        {docenti.map(docente => (
          <li className="list-group-item">
            <h5>{docente.nome}</h5>
            <p>{docente.materie[utente.classe]}</p>
            {Test(docente.valutato,docente.nome)}
            {console.log(docente.valutato)}
            
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ValutazioneDocenti;