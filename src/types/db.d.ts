import { type DocumentData } from 'firebase/firestore'
import type { legoSet } from '@/types/set';


interface userData extends DocumentData {
    wishlist?: legoSet[],
    owned?: legoSet[]
}