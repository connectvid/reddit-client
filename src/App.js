/* eslint-disable import/no-extraneous-dependencies */
import Routes from 'routes';
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/gemunu-libre/700.css';
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

// ==============================|| APP ||============================== //

const App = () => {
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
