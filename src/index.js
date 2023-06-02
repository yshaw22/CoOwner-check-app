async function init() {
  const userInfo = await miro.board.getUserInfo();
  const boardInfo = await await miro.board.getInfo();
  const jwtToken = await miro.board.getIdToken();

  const boardData = await fetchBoardOwners(userInfo.id, boardInfo.id, jwtToken);

  

  console.log("boardData: ",boardData)

  if (boardData.userIdIsOwner && (boardData.numOfBoardMembers > 2) && (boardData.numOfBoardOwners === 1)){
    console.log("Show Modal")
    await miro.board.ui.openModal({url: 'app.html'});
  }

  miro.board.ui.on('icon:click', async () => {
    //await miro.board.ui.openModal({url: 'app.html'});
  });
}

async function fetchBoardOwners(userId,boardId,jwtToken) {
  const headers = {'Authorization': `Bearer ${jwtToken}` }
  const response = await fetch(`${window.LAMBDA_ENDPOINT}&userId=${userId}&boardId=${boardId}`);
  const jsonData = await response.json();
  return jsonData;
}


init();
