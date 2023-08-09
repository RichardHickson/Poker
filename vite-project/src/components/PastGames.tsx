import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Game from "./Game";

const PastGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [openAccordionItems, setOpenAccordionItems] = useState<number[]>([]);

  useEffect(() => {
    getGames();
  }, []);

  function getGames() {
    const url = "https://pokerledger-server.azurewebsites.net/get-all-games";

    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((gamesFromServer) => {
        setGames(gamesFromServer);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const toggleAccordionItem = (gameID: number) => {
    if (openAccordionItems.includes(gameID)) {
      setOpenAccordionItems(openAccordionItems.filter((id) => id !== gameID));
    } else {
      setOpenAccordionItems([...openAccordionItems, gameID]);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container center col mt-3">
        <h1>Past Games</h1>
        <div className="col">
          <div className="accordion" id="accordionPanelsStayOpenExample">
            {games.map((game) => (
              <div className="accordion-item" key={game.gameID}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      openAccordionItems.includes(game.gameID)
                        ? ""
                        : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse${game.gameID}`}
                    aria-expanded={openAccordionItems.includes(game.gameID)}
                    aria-controls={`panelsStayOpen-collapse${game.gameID}`}
                    onClick={() => toggleAccordionItem(game.gameID)}
                  >
                    {game.gameTitle}
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapse${game.gameID}`}
                  className={`accordion-collapse collapse ${
                    openAccordionItems.includes(game.gameID) ? "show" : ""
                  }`}
                >
                  <div className="accordion-body border">
                    <h5>Players:</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Final Chip Count</th>
                          <th>Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {JSON.parse(game.gameInfo)
                          .sort((a: any, b: any) => b.profit - a.profit)
                          .map((player: any, index: number) => (
                            <tr key={index}>
                              <td>{player.name}</td>
                              <td>{player.finalChips}</td>
                              <td
                                style={{
                                  color: player.profit < 0 ? "red" : "green",
                                }}
                              >
                                {player.profit}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastGames;
