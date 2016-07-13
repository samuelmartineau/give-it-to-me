import React, {Component, PropTypes} from 'react'
import Dropzone from 'react-dropzone'
import CircularProgress from 'material-ui/CircularProgress'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentPhoto from 'material-ui/svg-icons/image/add-a-photo'
import RaisedButton from 'material-ui/RaisedButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import {uploadWinePicture, resetUpload} from '../actions'
import {PICTURE_UPLOAD} from '../constants/server'
import Image from '../components/Image'

export default class UploadPicture extends Component {
  onDrop = (files) => {
    const {dispatch} = this.props
    const winePicture = files[0]
    dispatch(uploadWinePicture(winePicture))
  }

  resetUpload = () => {
    const {dispatch} = this.props
    dispatch(resetUpload())
  }

  render () {
    const {isUploaded, isUploading, blur, thumbnailFileName} = this.props.upload
    let render

    if (isUploaded) {
      render = (
        <div style={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'}}>
          <Image
            width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
            height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
            src={thumbnailFileName}
            lazyLoader={blur} />
          <RaisedButton
            style={{margin: '12px'}}
            label='Changer de photo'
            labelPosition='before'
            secondary
            onTouchTap={this.resetUpload}
            icon={<ClearIcon />}
            />
        </div>
      )
    } else if (isUploading) {
      render = <CircularProgress />
    } else {
      render = (
        <div>
          <p>Cliquez sur le bouton pour prendre la photo</p>
          <Dropzone style={{}} onDrop={this.onDrop} multiple={false} accept='image/*'>
            <FloatingActionButton >
              <ContentPhoto />
            </FloatingActionButton>
          </Dropzone>
        </div>
      )
    }

    return (
      <div style={{textAlign: 'center'}}>
        {render}
      </div>
    )
  }
}

UploadPicture.propTypes = {
  dispatch: PropTypes.func.isRequired,
  upload: PropTypes.object.isRequired
}
