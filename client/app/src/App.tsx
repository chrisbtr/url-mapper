import React from 'react';
import './App.css';
import CreateMappingForm from "./components/CreateMappingForm/CreateMappingForm"
import TopBar from "./components/TopBar/TopBar"
import urlMappingsApi, { UrlMapping } from './api/urlMappings';

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

    urlMappingsApi.post(data).then(res => {
      console.log(res)
      setMappedUrls([...mappedUrls, data])
    }).catch(err => {
      console.log(err)
    });
  }

  React.useEffect(() => {
    urlMappingsApi.getAll().then(res => {
      setMappedUrls([...res.data]);
    }).catch(err => {
      console.log(err)
    });
    
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
