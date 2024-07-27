import { Link, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Copyright() {

  return (
    <Typography mt="-2" variant="body2" align="center" sx={{ color: 'text.secondary'}}>
            &copy; Ashutosh Gupta | Roopanjalee &nbsp; 
            <FavoriteIcon  color="error"  sx={{ fontSize: 18 ,mb:'-2px', ml:'-5px' }}/><br/>
            <Link variant="subtitle3" component={'a'} href="https://roopanjalee.in/" target="_blank">
            [Roopanjalee]
            </Link>
          </Typography>
  )
}
