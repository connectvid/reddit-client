import Routes from 'routes';
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
import { useState } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';

// ==============================|| APP ||============================== //

const App = () => {
    const [state, setState] = useState('');

    return (
        <ThemeCustomization>
            {/* RTL layout */}
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
