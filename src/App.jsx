import { useState } from "react";
import { MapPinned, Salad } from "lucide-react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [text, setText] = useState("");
  const [pagList, setPagList] = useState(false);
  const [sucess, setSucess] = useState(false);

  function handleConfirmar() {
    setLoading(true);

    if (nome == "KennyEloi_@S2") {
      getData();
      setPagList(true);
      return
    };

    if (nome == "") {
      setText("Necessário preencher com o nome");
      setLoading(false);
      return;
    };

    postName(nome);
    console.log("Confirmando presença de:", nome);
    setNome("");
    setText("");
    setLoading(false);
  }

  const getData = async () => {
    try {
      const res = await fetch("https://convitechakenny.runasp.net/Convite/GetConfirmados");
      const json = await res.json();

      setSucess(false);
      setData(json);
    } catch (error) {
      console.log(error.message);
      setText("Houve algum erro ao carregar os dados!");
    }
    setLoading(false);
  };

  const postName = async (nome) => {
    try {
      const res = await fetch("https://convitechakenny.runasp.net/Convite/PostConvidado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome }),
      });

       if(!res.status == 200 || !res.status == 201)
        throw new Error("Erro ao confirmar presença");

      console.log(res);
      setSucess(true);
      setText("Obrigada por confirmar presença.");
    } catch (error) {
      console.log(error.message);
      setText("Houve algum erro ao enviar os dados!");
    }
    setLoading(false);
  };

  return (
    <div>
      {!pagList ? (
        <div className="container">
          <div className="itens">
            <span className={sucess ? "suc" : "fal"}>{text}</span>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <div className="botoes">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+Av.+Prestes+Maia,+685,+Jardim+d%27Abril,+Osasco"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mapa"
              >
                <MapPinned />
              </a>
              <button onClick={handleConfirmar}>
                {loading ? <p>Carrengando</p> : <p>Confirmar presença</p>}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="lista">
          <h1>Lista de presenças</h1>
          <span className={sucess ? "suc" : "fal"}>{text}</span>
          {data?.map((item) =>(
            <li key={item.id}>{item.id}-{item.nome}</li>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;