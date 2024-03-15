function jsonData(link) {
  let data = [];
  async function getData() {
    let response = await fetch(link);
    data = await response.json();
  }

  return { data, getData };
}

let apiData = jsonData(
  "http://localhost/Programming-Practice/Api%20App/api/2.2-where.php"
);
// newData = apiData.getData();
// console.log(newData);

function pushData() {
  newData = apiData.getData();
  newData = apiData.data;
  console.log(newData);

  //   for (const item of newData) {
  //   }
}

pushData();
