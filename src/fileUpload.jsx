import React, { useState, Fragment } from "react";


export default function FileUpload({setError, setUserList, setLoading}) {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {

    if(!file){
      setError("Please select a csv file");
      return;
    }
    
    setLoading(true);

    const date = new Date();
    const url = "http://localhost:8089/user/upload?date="+date.getTime();

    const formData = new FormData();
    formData.append("file", file);

    $.ajax({      
      "url" : url,
      "type" : "POST",
      "processData" : false,
      "contentType" : false,
      "data" : formData,
      "success" : function(data){         
        setUserList(data);
        setLoading(false);
      },
      "error" : function(xhr, status, error){
        setError(xhr.responseJSON?.error || "Upload failed");
        setLoading(false);
      }
    });
   
  };

  return (
    <Fragment>
      <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#fileUploadModal">
          Upload User
      </button>
      
      <div className="modal fade" id="fileUploadModal" tabindex="-1" role="dialog" aria-labelledby="fileUploadModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
                
              <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title" id="fileUploadModalLabel">User's Upload</h4>
              </div>
                
              <div className="modal-body">
                <form>
                    <div className="form-group">
                      <label for="usernameId">Select File</label>
                      <input className="form-control" type="file" accept=".csv" onChange={handleFileChange} />                      
                    </div>
                </form>
              </div>
                              
              <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
              </div>

          </div>
        </div>
      </div>
    </Fragment>  
  );
}

