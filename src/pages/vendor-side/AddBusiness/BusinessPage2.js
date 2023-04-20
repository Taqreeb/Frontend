import React from 'react'
import MyImagePickerAlbum from '../../../components/ImagePickers/MyImagePickerAlbum'


const BusinessPage2 = (props) => {
  return (
    <div>
      <MyImagePickerAlbum showAlert={props.showAlert}/>
    </div>
  )
}

export default BusinessPage2
