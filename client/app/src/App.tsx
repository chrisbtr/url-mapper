import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateMappingForm from "./components/CreateMappingForm/CreateMappingForm"
import TopBar from "./components/TopBar/TopBar"


type UrlMapping = { 
  fullURL: string,
  urlKey: string
}

function App() {
  const [url, setUrl] = React.useState('')
  const [urlKey, setUrlKey] = React.useState('')
  const [mappedUrls, setMappedUrls] = React.useState<UrlMapping[]>([])

  const handleUrlInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrl(event.target.value)
  }

  const handleUrlKeyInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrlKey(event.target.value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(event)
    const data: UrlMapping = {fullURL: url, urlKey: urlKey}
    console.log(data)

    const endpoint = process.env.REACT_APP_SERVER_ENDPOINT
    if (endpoint === undefined) {
      return;
    }
    
    fetch(endpoint, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res)
      setMappedUrls([...mappedUrls, data])
    }).catch(err => {
      console.log(err)
    })
  }

  React.useEffect(() => {
    const endpoint = process.env.REACT_APP_SERVER_ENDPOINT
    if (endpoint === undefined) {
      return;
    }

    fetch(endpoint, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
      mode: "cors",
    }).then(res => {
      console.log(res)
      res.json().then((res: UrlMapping[]) => {
        setMappedUrls([...res])
      })
    }).catch(err => {
      console.log(err)
    })
    
  }, [])

  return (
    <div className="App">
      
      <TopBar />
      <CreateMappingForm 
        paperFormProps={{onSubmit: handleSubmit}} 
        urlTextFieldProps={{onChange: handleUrlInputChange, value: url}} 
        urlKeyTextFieldProps={{onChange: handleUrlKeyInputChange, value: urlKey}}  
      />
      
      <h2>All Mappings:</h2>
      <div>
        {mappedUrls.map(mappedUrl => <div key={mappedUrl.urlKey}><a href={mappedUrl.fullURL}>{mappedUrl.urlKey}</a></div>)}
      </div>
    </div>
  );
}

export default App;
