import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    console.log('TabLayout aqui')

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>

            <Tabs.Screen
                name="produtos"
                options={{
                    title: 'Estoque',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="fornecedores"
                options={{
                    title: 'Fornecedores',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'storefront' : 'storefront-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="relatorios"
                options={{
                    title: 'Relatórios',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'analytics' : 'analytics-outline'} color={color}/>
                    ),
                }}
            />


            {/*TODO: Exemplos de telas e configurações, depois alterar o index e apontar para produtos*/}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Welcome',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
