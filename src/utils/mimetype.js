const mimeType = {
  extensions: [
    {
      // Powerpoint
      keyWords: [
        'odp',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ],
      className: 'sprite-keynote'
    },
    {
      // Word
      keyWords: ['msword', 'vnd.ms-office', 'doc'],
      className: 'sprite-word'
    },
    {
      // Zip
      keyWords: ['zip', 'x-gzip'],
      className: 'sprite-zip'
    },
    {
      // Spreadsheet
      keyWords: [
        'spreadsheet',
        'ods',
        'vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ],
      className: 'sprite-xls'
    },
    {
      // PDF
      keyWords: ['application/pdf'],
      className: 'sprite-pdf'
    },
    {
      // Image
      keyWords: ['image/jpeg', 'image/png'],
      className: 'sprite-image'
    },
    {
      // Video
      keyWords: ['application/video'],
      className: 'sprite-video'
    }
  ],

  /**
        Set default icon for a File using its mimeType property
        @file: File object
      * */
  setIcon(file) {
    let isFound = false;
    let spriteName = '';
    // Loop over each extension
    mimeType.extensions.map(ext => {
      // Check for its keywords if it maches
      return ext.keyWords.map(key => {
        if (file.type === key) {
          isFound = true;
          spriteName = ext.className;
          return spriteName;
        }
        return null;
      });
    });
    if (!isFound) {
      return 'sprite-brut';
    }
    return spriteName;
  }
};

export default mimeType;
