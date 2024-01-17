import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../page/HomeScreen';
import DetailStore from '../page/DetailStore';
import editAcc from '../page/editAcc';
import changePassword from '../page/changePassword';
import AccScreen from '../page/AccScreen';
import StoreAll from '../page/StoreAll';
//import MapViewScreen from '../page/MapView';
import StoreReviewStack from '../page/StoreReview';
import AddReview from '../page/AddReview';

import NewPage from '../page/NewPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
            return (
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="DetailStore" component={DetailStore} />
                <Stack.Screen name="editAcc" component={editAcc} />
                <Stack.Screen name="changePassword" component={changePassword} />
                <Stack.Screen name="AccScreen" component={AccScreen} />
                <Stack.Screen name="StoreAll" component={StoreAll} />
                {/* <Stack.Screen name="MapViewScreen" component={MapViewScreen} /> */}
                
            </Stack.Navigator>
            );
        };

export default createAppContainer(AppNavigator);