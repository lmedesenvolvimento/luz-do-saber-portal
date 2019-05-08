import formComponents from './form'
export default {
    'navbar': require('@/components/ui/navbars/Navbar').default,
    'ls-gameplay': require('@/components/ui/Gameplay').default,
    ...formComponents
};