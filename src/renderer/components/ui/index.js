import formComponents from './form'
export default {
    'navbar': require('@/components/ui/navbars/Navbar').default,
    'ls-gameplay': require('@/components/ui/Gameplay').default,
    'ls-image': require('@/components/ui/AsyncImage').default,
    ...formComponents
}