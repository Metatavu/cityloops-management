  /**
   * Retrieve pre-signed POST data from a dedicated API endpoint.
   *
   * @param selectedFile
   * @returns {Promise<any>}
   */
  export const getPresignedPostData = (selectedFile: File, userId: string): Promise<any> => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      const url = process.env.REACT_APP_USER_CONTENT_UPLOAD_URL as string;

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          userId: userId,
          name: selectedFile.name,
          type: selectedFile.type
        })
      );
      xhr.onload = function() {
        resolve(JSON.parse(this.responseText));
      };
    });
  };

  /**
   * Upload file to S3 with previously received pre-signed POST data.
   *
   * @param presignedPostData
   * @param file
   * @returns {Promise<any>}
   */
  export const uploadFileToS3 = (presignedPostData: any, file: File) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Object.keys(presignedPostData.fields).forEach(key => {
        formData.append(key, presignedPostData.fields[key]);
      });

      formData.append("file", file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", presignedPostData.url, true);
      xhr.send(formData);
      xhr.onload = function() {
        this.status === 204 ? resolve() : reject(this.responseText);
      };
    });
  };