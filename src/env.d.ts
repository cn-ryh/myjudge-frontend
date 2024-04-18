declare interface Window {
    electronAPI: {
        createDataBase: (password: string) => Promise<void>,
        createKeyPair: (name: string, email: string, upload: boolean) => Promise<string>
        chooseFiles: (conf:SaveDialogOptions)=> Promise<Electron.OpenDialogReturnValue>,
        connectDataBase: (databasePos:string,password:string) => Promise<void>,
        listKeys: () => Promise<{keyPair:{id:string, name:string, email:string}[],publicKey:{id:string, name:string, email:string}[]}>,
        exportPublicKey: (id:string) => Promise<string>,
        uploadPublicKey: (id:string) => Promise<string>
    }
}
declare interface SaveDialogOptions {
    /**
     * The dialog title. Cannot be displayed on some _Linux_ desktop environments.
     */
    title?: string;
    /**
     * Absolute directory path, absolute file path, or file name to use by default.
     */
    defaultPath?: string;
    /**
     * Custom label for the confirmation button, when left empty the default label will
     * be used.
     */
    buttonLabel?: string;
    filters?: FileFilter[];
    /**
     * Message to display above text fields.
     *
     * @platform darwin
     */
    message?: string;
    /**
     * Custom label for the text displayed in front of the filename text field.
     *
     * @platform darwin
     */
    nameFieldLabel?: string;
    /**
     * Show the tags input box, defaults to `true`.
     *
     * @platform darwin
     */
    showsTagField?: boolean;
    properties?: Array<'showHiddenFiles' | 'createDirectory' | 'treatPackageAsDirectory' | 'showOverwriteConfirmation' | 'dontAddToRecent'>;
    /**
     * Create a security scoped bookmark when packaged for the Mac App Store. If this
     * option is enabled and the file doesn't already exist a blank file will be
     * created at the chosen path.
     *
     * @platform darwin,mas
     */
    securityScopedBookmarks?: boolean;
  }

declare interface SaveDialogOptions {
    /**
     * The dialog title. Cannot be displayed on some _Linux_ desktop environments.
     */
    title?: string;
    /**
     * Absolute directory path, absolute file path, or file name to use by default.
     */
    defaultPath?: string;
    /**
     * Custom label for the confirmation button, when left empty the default label will
     * be used.
     */
    buttonLabel?: string;
    filters?: FileFilter[];
    /**
     * Message to display above text fields.
     *
     * @platform darwin
     */
    message?: string;
    /**
     * Custom label for the text displayed in front of the filename text field.
     *
     * @platform darwin
     */
    nameFieldLabel?: string;
    /**
     * Show the tags input box, defaults to `true`.
     *
     * @platform darwin
     */
    showsTagField?: boolean;
    properties?: Array<'showHiddenFiles' | 'createDirectory' | 'treatPackageAsDirectory' | 'showOverwriteConfirmation' | 'dontAddToRecent'>;
    /**
     * Create a security scoped bookmark when packaged for the Mac App Store. If this
     * option is enabled and the file doesn't already exist a blank file will be
     * created at the chosen path.
     *
     * @platform darwin,mas
     */
    securityScopedBookmarks?: boolean;
}
