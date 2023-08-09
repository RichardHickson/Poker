import Button from "./Button";
import { useState, ChangeEvent } from "react";
import Player from "./Player";
import Alert from "./Alert";
import Navbar from "./Navbar";
import Game from "./Game";

function PokerLedger() {
  const [chipCount, setChipCount] = useState("");
  const [buyIn, setBuyIn] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [isEditable, setIsEditable] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [showGameInfo, setShowGameInfo] = useState(false);
  const [showNanAlert, setShowNanAlert] = useState(false);
  const [showNoNameAlert, setShowNoNameAlert] = useState(false);
  const [editedPlayerIndex, setEditedPlayerIndex] = useState<number | null>(
    null
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [chipCountEd, setChipCountEd] = useState("");
  const [buyInEd, setBuyInEd] = useState("");
  const [nameEd, setNameEd] = useState("");
  const [isFinished, setisFinished] = useState(false);
  const [finalChipCounts, setFinalChipCounts] = useState<{
    [key: number]: number;
  }>({});
  const [finalEnter, setFinalEnter] = useState(false);
  const [isGameSaved, setIsGameSaved] = useState(false);

  const handleChipCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChipCount(e.target.value);
  };

  const handleBuyInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyIn(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChipCountChangeEd = (e: ChangeEvent<HTMLInputElement>) => {
    setChipCountEd(e.target.value);
  };

  const handleBuyInChangeEd = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyInEd(e.target.value);
  };

  const handleNameChangeEd = (e: ChangeEvent<HTMLInputElement>) => {
    setNameEd(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBuyIn = () => {
    setShowNanAlert(false);
    setIsEditable(!isEditable);
  };

  const handleReBuyIn = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].buyIn += parseInt(buyIn);
    updatedPlayers[index].chipCount += parseInt(chipCount);
    setPlayers(updatedPlayers);
  };

  const handleEdit = (index: number) => {
    setEditedPlayerIndex(index);
    setIsEditModalVisible(true);
    setBuyInEd(String(players[index].buyIn));
    setNameEd(String(players[index].name));
    setChipCountEd(String(players[index].chipCount));
  };

  const handleAddPlayer = () => {
    if (isNaN(parseFloat(buyIn)) && isNaN(parseFloat(chipCount))) {
      setShowNanAlert(true);
    } else if (name === "") {
      setShowNanAlert(false);
      setShowNoNameAlert(true);
    } else {
      const newPlayer: Player = {
        name: name,
        buyIn: parseInt(buyIn),
        chipCount: parseInt(chipCount),
        finalChips: 0,
        profit: 0,
      };
      setPlayers([...players, newPlayer]);
      setName("");
      setShowNanAlert(false);
      setShowNoNameAlert(false);
    }
  };

  const removePlayer = () => {
    if (editedPlayerIndex !== null) {
      players.splice(editedPlayerIndex, 1);
    }
    setIsEditModalVisible(false);
  };

  const handleGameInfo = () => {
    setShowGameInfo(!showGameInfo);
  };

  const handleFinish = () => {
    setisFinished(true);
    const initialFinalChipCounts: { [key: number]: number } = {};
    players.forEach((player, index) => {
      initialFinalChipCounts[index] = 0;
    });
    setFinalChipCounts(initialFinalChipCounts);
    const updatedPlayers = players.map((player, index) => {
      return {
        ...player,
        finalChips: finalChipCounts[index],
      };
    });
    setPlayers(updatedPlayers);
  };

  const handleFinalChips = () => {
    setFinalEnter(true);
    setIsDone(true);
  };

  const handleSendToServer = () => {
    const gameCreate = {
      gameID: 0,
      gameTitle: title,
      gameInfo: JSON.stringify(players),
    };

    const url = "https://pokerledger-server.azurewebsites.net/create-game";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        setIsGameSaved(true);
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container text-left mt-4">
        <h6>Set your buy in and chip count below, then add players.</h6>
        <h6>Once finished, please follow the prompts.</h6>
      </div>
      <div className="container text-left mt-4">
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">Buy In ($)</span>
              <input
                disabled={!isEditable}
                onChange={handleBuyInChange}
                value={buyIn}
                placeholder="100"
                type="number"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">Chip Count</span>
              <input
                disabled={!isEditable}
                onChange={handleChipCountChange}
                value={chipCount}
                placeholder="550"
                type="number"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
            </div>
          </div>
          <div className="col-md-4">
            <Button onClick={handleBuyIn}>
              {isEditable ? "Set Buy In" : "Edit Buy In"}
            </Button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">Player Name</span>
              <input
                className="form-control"
                onChange={handleNameChange}
                value={name}
                placeholder="Phil Ivey"
              />
              <Button onClick={handleAddPlayer}>Add Player</Button>
            </div>
          </div>
        </div>
        {showNanAlert && (
          <Alert onClose={() => setShowNanAlert(false)}>
            Buy In and/or Chip Count have not been set.
          </Alert>
        )}
        {showNoNameAlert && (
          <Alert onClose={() => setShowNoNameAlert(false)}>
            No name has been set.
          </Alert>
        )}
        <div className="row">
          <div className="col-md-11">
            <div className="container">
              <br></br>
              <h3>Players</h3>
              <table className="table table-bordered table-light">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Buy In ($)</th>
                    <th>Chip Count</th>
                    <th>Add Buy In</th>
                    <th>Edit Player</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {players.map((player, index) => (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td>{player.buyIn}.00</td>
                      <td>{player.chipCount}</td>
                      <td>
                        <Button
                          onClick={() => handleReBuyIn(index)}
                          size=" btn-sm"
                        >
                          Re-Buy
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => handleEdit(index)}
                          size=" btn-sm"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {players.length > 0 && (
                  <tfoot>
                    <tr className="table-danger">
                      <td>{players.length} Players</td>
                      <td>
                        {" "}
                        {players.reduce((sum, player) => sum + player.buyIn, 0)}
                        .00
                      </td>
                      <td>
                        {players.reduce(
                          (sum, player) => sum + player.chipCount,
                          0
                        )}
                      </td>
                      <td>
                        1 Chip: ${""}
                        {(
                          players.reduce(
                            (sum, player) => sum + player.buyIn,
                            0
                          ) /
                          players.reduce(
                            (sum, player) => sum + player.chipCount,
                            0
                          )
                        ).toFixed(5)}
                      </td>
                      <td>
                        <button
                          onClick={handleFinish}
                          className="btn btn-danger btn-sm"
                        >
                          Finish Game
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>

        {editedPlayerIndex !== null && (
          <div
            className={`modal fade ${isEditModalVisible ? "show d-block" : ""}`}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Player</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setIsEditModalVisible(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Name</span>
                    <input
                      onChange={handleNameChangeEd}
                      value={nameEd}
                      placeholder=""
                      type="text"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                    ></input>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Buy In ($)</span>
                    <input
                      onChange={handleBuyInChangeEd}
                      value={buyInEd}
                      placeholder=""
                      type="text"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                    ></input>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Chip Count</span>
                    <input
                      onChange={handleChipCountChangeEd}
                      value={chipCountEd}
                      placeholder=""
                      type="text"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                    ></input>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={removePlayer}
                  >
                    Remove Player
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditModalVisible(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setIsEditModalVisible(false);
                      players[editedPlayerIndex].name = nameEd;
                      players[editedPlayerIndex].buyIn = parseInt(buyInEd);
                      players[editedPlayerIndex].chipCount =
                        parseInt(chipCountEd);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showGameInfo && (
          <div className="row mt-3">
            <div className="col-md-6">
              <h1>Game Info</h1>
              <p>Players: {players.length}</p>
              <p>
                Total Pot: $
                {players.reduce((sum, player) => sum + player.buyIn, 0)}
              </p>
              <p>
                Total Chips:{" "}
                {players.reduce((sum, player) => sum + player.chipCount, 0)}
              </p>
              <p>
                1 Chip: ${""}
                {(
                  players.reduce((sum, player) => sum + player.buyIn, 0) /
                  players.reduce((sum, player) => sum + player.chipCount, 0)
                ).toFixed(5)}
              </p>
            </div>
          </div>
        )}
        <div>
          {isFinished && (
            <div className="container">
              <h1>Enter Chip Counts</h1>
              <table className="table table-bordered table-light">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Final Chip Count</th>
                    <th>Cashout</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td>
                        <input
                          className="form-control"
                          type="number"
                          value={finalChipCounts[index] || ""}
                          onChange={(e) => {
                            const updatedFinalChipCounts = {
                              ...finalChipCounts,
                            };
                            updatedFinalChipCounts[index] = parseInt(
                              e.target.value
                            );
                            setFinalChipCounts(updatedFinalChipCounts);
                            const updatedPlayers = [...players];
                            updatedPlayers[index].finalChips = parseInt(
                              e.target.value
                            );
                            setPlayers(updatedPlayers);
                          }}
                        />
                      </td>
                      <td>
                        {finalEnter &&
                          (
                            (player.finalChips /
                              players.reduce(
                                (sum, player) => sum + player.finalChips,
                                0
                              )) *
                            players.reduce(
                              (sum, player) => sum + player.buyIn,
                              0
                            )
                          ).toFixed(2)}
                      </td>
                      <td
                        style={{
                          color:
                            player.finalChips > player.chipCount
                              ? "green"
                              : "red",
                        }}
                      >
                        {finalEnter &&
                          (() => {
                            const profit =
                              (player.finalChips /
                                players.reduce(
                                  (sum, player) => sum + player.finalChips,
                                  0
                                )) *
                                players.reduce(
                                  (sum, player) => sum + player.buyIn,
                                  0
                                ) -
                              player.buyIn -
                              0.01;

                            player.profit = parseFloat(profit.toFixed(2));

                            return player.profit;
                          })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button onClick={handleFinalChips}>All Entered</Button>
            </div>
          )}
        </div>
        {isDone && (
          <div>
            {isGameSaved && (
              <div className="alert alert-success mt-3" role="alert">
                Game has been saved successfully.
              </div>
            )}

            {!isGameSaved && (
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">Game Title</span>
                    <input
                      onChange={handleTitleChange}
                      value={title}
                      placeholder="Poker Game #1"
                      type="text"
                      className="form-control"
                      aria-label="Game Title"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <Button onClick={handleSendToServer}>Save Game</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <footer style={{ height: "1000px" }} />
    </div>
  );
}

export default PokerLedger;
