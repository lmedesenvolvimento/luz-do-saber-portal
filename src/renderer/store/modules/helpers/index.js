export const PointingsTypes = {
    LostByAttempt: 'lost_a_star_by_attempt',
    LostByTime: 'lost_a_star_by_time'
}

export const ClusterTypes = [
    'atividade-texto-imagem'
]

export const MaxStars = 3

export const initialStateLog = {
    timer: {
        totalSeconds: 0
    },
    errors: {
        total: 0
    },
    pointings: {
        totalStars: 0
    }
}