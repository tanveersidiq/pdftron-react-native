import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  BackHandler,
  Alert
} from 'react-native';

import { DocumentView, annotationManager, RNPdftron, Config } from 'react-native-pdftron';

type Props = {

};
export default class App extends Component<Props> {
  xfdfCommand = '';
  constructor(props) {
    super(props);
  }

  onLeadingNavButtonPressed = () => {
    console.log('leading nav button pressed');
    if (this._viewer) {
      this._viewer.setStampImageData().then((annotationId, pageNumber, stampImageDataUrl) => {
        annotationID = '75911d3a-f1fa-7a4f-8137-5885e3a4c4ae',
          pageNumber = 1,
          stampImageData = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
      });
    }

    if (Platform.OS === 'ios') {
      Alert.alert(
        'App',
        'onLeadingNavButtonPressed',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true }
      )
    } else {
      BackHandler.exitApp();
    }
  }

  onDocumentLoaded = () => {
    // debugger
    // if (this._viewer) {
    //   const xfdf = '<?xml version="1.0" encoding="UTF-8"?>\n<xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve">\n\t<annots>\n\t\t<circle style="solid" width="5" color="#E44234" opacity="1" creationdate="D:20190729202215Z" flags="print" date="D:20190729202215Z" page="0" rect="138.824,653.226,236.28,725.159" title="" />\n\t\t<circle style="solid" width="5" color="#E44234" opacity="1" creationdate="D:20190729202215Z" flags="print" date="D:20190729202215Z" page="0" rect="103.114,501.958,245.067,590.92" title="" />\n\t\t<circle style="solid" width="5" color="#E44234" opacity="1" creationdate="D:20190729202216Z" flags="print" date="D:20190729202216Z" page="0" rect="117.85,336.548,328.935,451.568" title="" />\n\t\t<freetext TextColor="#363636" style="solid" width="0" opacity="1" creationdate="D:20190729202455Z" flags="print" date="D:20190729202513Z" page="0" rect="320.774,646.323,550.446,716.498" title="">\n\t\t\t<defaultstyle>font: Roboto 24pt;color: #363636</defaultstyle>\n\t\t\t<defaultappearance> 1 1 1 RG 1 1 1 rg /F0 24 Tf </defaultappearance>\n\t\t\t<contents>HELLO PDFTRON!!!</contents>\n\t\t\t<apref y="716.498" x="320.774" gennum="0" objnum="404" />\n\t\t</freetext>\n\t\t<line style="solid" width="5" color="#E44234" opacity="1" creationdate="D:20190729202507Z" flags="print" start="278.209,212.495" end="214.177,411.627" head="None" tail="OpenArrow" date="D:20190729202507Z" page="0" rect="206.039,211.73,280.589,416.387" title="" />\n\t</annots>\n\t<pages>\n\t\t<defmtx matrix="1.333333,0.000000,0.000000,-1.333333,0.000000,1056.000000" />\n\t</pages>\n\t<pdf-info version="2" xmlns="http://www.pdftron.com/pdfinfo" />\n</xfdf>';
    //   this._viewer.importAnnotations(xfdf);
    // }
  }

  onAnnotationChanged = ({ action, annotations }) => {
    if (this._viewer) {

      this._viewer.exportAnnotations({ annotList: annotations }).then((xfdf) => {
        if (xfdf !== '') {
          // this.xfdfCommand = xfdf;
          this._viewer.deleteAnnotations(annotations).then((xfdf2) => {
            // this._viewer.addAnnotations(this.xfdfCommand, false).then((xfdf3)=>{
            //   // this.xfdfCommand='';
            // });

            // this._viewer.importAnnotations(this.xfdfCommand).then((x) => {

            // });
          });
        }

      });

    }
  }

  onZoomChanged = ({ zoom }) => {
    // console.log('zoom', zoom);
  }

  onExportAnnotationCommand = ({ action, xfdfCommand }) => {
    // debugger;
    // this._viewer.importAnnotations(xfdfCommand);
    if (action === 'add') {
      //  this.xfdfCommand=xfdfCommand;
    }
  }

  setStampImageData = ({ annotationId, pageNumber, stampImageDataUrl }) => {
    annotationID = '75911d3a-f1fa-7a4f-8137-5885e3a4c4ae',
      pageNumber = 1,
      stampImageData = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
  }

  render() {
    const path = "https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_about.pdf";
    const myToolbar = {
      [Config.CustomToolbarKey.Id]: 'myToolbar',
      [Config.CustomToolbarKey.Name]: 'myToolbar',
      [Config.CustomToolbarKey.Icon]: Config.ToolbarIcons.FillAndSign,
      [Config.CustomToolbarKey.Items]: [Config.Tools.annotationCreateArrow, Config.Tools.annotationCreateCallout, Config.Buttons.undo]
    };

    return (
      <DocumentView
        ref={(c) => this._viewer = c}
        hideDefaultAnnotationToolbars={[Config.DefaultToolbars.Annotate]}
        annotationToolbars={[Config.DefaultToolbars.Annotate, myToolbar]}
        hideAnnotationToolbarSwitcher={false}
        hideTopToolbars={false}
        hideTopAppNavBar={false}
        document={path}
        padStatusBar={true}
        showLeadingNavButton={true}
        leadingNavButtonIcon={Platform.OS === 'ios' ? 'ic_close_black_24px.png' : 'ic_arrow_back_white_24dp'}
        onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
        onDocumentLoaded={this.onDocumentLoaded}
        onAnnotationChanged={this.onAnnotationChanged}
        onExportAnnotationCommand={this.onExportAnnotationCommand}
        onZoomChanged={this.onZoomChanged}
        readOnly={false}
        disabledElements={[Config.Buttons.userBookmarkListButton]}
        disabledTools={[Config.Tools.annotationCreateLine, Config.Tools.annotationCreateRectangle]}
        fitMode={Config.FitMode.FitPage}
        layoutMode={Config.LayoutMode.Continuous}
        setStampImageData={this.setStampImageData}
        openOutlineList={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
