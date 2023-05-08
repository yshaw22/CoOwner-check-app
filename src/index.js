async function init() {
  const userInfo = await miro.board.getUserInfo();
  const boardInfo = await await miro.board.getInfo();

  const boardData = await fetchBoardOwners(userInfo.id, boardInfo.id);

  console.log("boardData: ",boardData)

  if (boardData.userIdIsOwner && (boardData.numOfBoardMembers > 1) && (boardData.numOfBoardOwners === 1)){
    console.log("Show Modal")
    await miro.board.ui.openModal({url: 'app.html'});
  }

  miro.board.ui.on('icon:click', async () => {
    //await miro.board.ui.openModal({url: 'app.html'});
  });
}

async function fetchBoardOwners(userId,boardId) {
  const response = await fetch(`${window.LAMBDA_ENDPOINT}/hello?userId=${userId}&boardId=${boardId}`);
  const jsonData = await response.json();
  return jsonData;
}


init();
