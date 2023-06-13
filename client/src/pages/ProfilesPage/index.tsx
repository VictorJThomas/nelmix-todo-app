import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { NavBar } from "../../common/NavBar";
import axios from "axios";

type ProfileAccessRecord = {
  username: string;
  profileType: string;
  accessedAt: string;
};

type ProfilesPageProps = {
  isGuest?: boolean;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ProfilesPage: React.FC<ProfilesPageProps> = ({ isGuest }) => {
  const [accessRecords, setAccessRecords] = useState<ProfileAccessRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAccessRegistry = async () => {
      try {
        const response = await axios.get<ProfileAccessRecord[]>(
          "http://localhost:3000/api/user/registry"
        );
        setAccessRecords(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch access registry");
        setIsLoading(false);
      }
    };

    fetchAccessRegistry();
  }, []);

  const getProfileTypeLabel = (isGuest: boolean): string => {
    return isGuest ? "Guest" : "User";
  };

  return (
    <>
      <NavBar />
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell align="right">Type Account</StyledTableCell>
                <StyledTableCell align="right">Access Time</StyledTableCell>
              </TableHead>
              <TableBody>
                {accessRecords.map((record) => (
                  <StyledTableRow key={record.username}>
                    <StyledTableCell component="th" scope="row">
                      {record.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {getProfileTypeLabel(record.profileType === "true")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {record.accessedAt}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};
