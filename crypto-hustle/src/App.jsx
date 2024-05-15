import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const API_KEY = "fcaee68d02f02b34e1291dce714a2e4c26e2d5ccf60a5af6e656e0b0c0a61171"


  //list of coins we want to show
  const [list, setList] = useState(null);


  const getData = async (COIN)=> {
    let query = `https://min-api.cryptocompare.com/data/all/coinlist`
    const response = await fetch(query); //put querey here
    const fetchedData = await response.json();
    if (fetchedData == null){
      console.log("fetchedData is null apparently")
    }
    if (fetchedData.Response !== "Success") {   //!== is strict not-equal operator
      alert("Query did not work")
    }

    console.log(fetchedData.Data)

    setList(fetchedData.Data)

    //return fetchedData.Data
  };

  // const displayData = () => {
  //   const data = getData();
  //   for (const entry in data){
  //     //make another call to get the price, (make a query to a funciton called getPrice(COIN_ID))
  //     //let curr = entry.FullName + entry
  //     console.log("entered data loop")
  //     addToShowList(entry.FullName)
  //     console.log("entry.FullName is", entry.FullName)
  //   };
  //   console.log("showList is now:", showList)
  // };

  useEffect(()=> {
    //make it render once
    console.log("in useEffect")
    getData().catch(console.error)
  }, [])

  //map is the best way to display a list of items in JSX
  return (
    <div className="whole-page">
        <h1>My Crypto List</h1>
          <ul>
            {/* since fetchedData.data is a series of key-value pairs, we can use Object.entries()
                use a map to display the items */}
            {list && Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                  <li key={list.Data[coin].FullName}>{list.Data[coin].FullName}</li>
                ) : null
            )}
              
          </ul>
    </div>
  )
}

export default App
