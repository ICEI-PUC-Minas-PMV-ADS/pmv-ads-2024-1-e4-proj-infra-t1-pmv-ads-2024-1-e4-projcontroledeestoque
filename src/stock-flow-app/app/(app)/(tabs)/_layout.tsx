import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Produtos',
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
            <Tabs.Screen
                name="usuario"
                options={{
                    title: 'Conta',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
