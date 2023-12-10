import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../utils/store';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
export default function CustomizedBadges() {
    const { total } = useAppSelector(state => state.shop)
    return (
        <div>
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={total} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </div>
    );
}