// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import QuestionListTable from './QuestionListTable'

const QuestionsList = ({ tableTitle, questionsData }: { tableTitle: string; questionsData?: any[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <QuestionListTable title={tableTitle} tableData={questionsData} />
      </Grid>
    </Grid>
  )
}

export default QuestionsList
