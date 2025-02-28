export const loginAsUser = (user) => ({ type: 'LOGINASUSER',user:user});

export const loginAsAdmin = (user) => ({ type: 'LOGINASADMIN',admin:user});

export const logout = () => ({ type: 'LOGOUT'});

export const showDrawer = (title,content) =>({ type: 'SHOWDRAWER',title:title,content:content})

export const showInnerDrawer = (title,content) =>({ type: 'SHOWINNERDRAWER',title:title,content:content})

export const closeDrawer = () =>({ type: 'CLOSEDRAWER'})

export const resetDrawer = () =>({ type: 'RESETDRAWER'})

export const showSignIn= () =>({ type: 'SHOWSIGNIN'})

export const showSignUp= () =>({ type: 'SHOWSIGNUP'})

export const cancelModal= () =>({ type: 'CANCELMODAL'})

export const setOnCancel = (onCancel) =>({ type: 'SETONCANCEL',onCancel:onCancel})

export const showSignInWithOnCancel = (onCancel) =>({ type: 'SHOWSIGNINCANCEL',onCancel:onCancel})