import React from 'react';
import './App.css';
import CreateMappingForm from "./components/CreateMappingForm/CreateMappingForm"
import urlMappingsApi, { UrlMapping } from './api/urlMappings';

function App() {
  const [url, setUrl] = React.useState('')
  const [urlKey, setUrlKey] = React.useState('')

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
    }).catch(err => {
      console.log(err)
    });
  }

  return (
    <div className="App">
      <CreateMappingForm 
        paperFormProps={{onSubmit: handleSubmit}} 
        urlTextFieldProps={{onChange: handleUrlInputChange, value: url}} 
        urlKeyTextFieldProps={{onChange: handleUrlKeyInputChange, value: urlKey}}  
      />
    </div>
  );
}

export default App;
