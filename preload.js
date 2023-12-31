const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    openDialog: (method, config) => {
      const result = ipcRenderer.invoke('dialog', method, config);
      return result;
    },
    saveFileNames: (callback) => {
        ipcRenderer.on("file_names", (event, data) => {
            callback(data);
        })
    },
    loadImages : (offerId, brandId, mode) => {
      ipcRenderer.invoke('load_images', {offerId, brandId, mode});
    },
    onFilenames: (callback) => {
      ipcRenderer.on('loaded_filenames', (e, params) => {
        callback(params);
      });
    },
    // open savefiledialog
    savePdfDialog : (data) => {
      ipcRenderer.invoke('save_pdf_dialog', data);
    },
    // open savedocfiledialog
    saveDocDialog : (data) => {
      ipcRenderer.invoke('save_doc_dialog', data);
    },
    onPdfFileSave: (callback) => {
      ipcRenderer.on("generated_pdf", (event, data) => {
        callback(data);
      });
    },
    onDocFileSave: (callback) => {
      ipcRenderer.on("generated_doc", (event, data) => {
        callback(data);
      });
    },
    saveOfferDialog : (data) => {
      ipcRenderer.invoke("save_offer_dialog", data);
    },
    onObsSave: (callback) => {
      ipcRenderer.on("generated_obs", (event, data) => {
        callback(data);
      });
    }
});