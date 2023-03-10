import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils/currencyFormatter"

const BudgetCard = ({name, amount, max, grey, onAddExpenseClick, onViewExpenseClick, hideButtons}) => {
    let classNames = []
    if(amount > max){
        classNames.push("bg-danger", "bg-opacity-10")
    }else if(grey){
        classNames.push("bg-light")
    }
    const getProgressBarColor = (amount, max) =>{
        let ratio = amount/max;
        if(ratio < 0.5) return "primary"
        if(ratio < 0.75) return "warning"
        return "danger"
    }
  return (
    <div>
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                <div className="me-2">{name}</div>
                <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)} 
                    {max && <span className="fs-6 muted ms-1">
                        / {currencyFormatter.format(max)}
                    </span>}
                </div>
                </Card.Title>
                { max &&
                <ProgressBar 
                    className="rounded-pill" 
                    variant={getProgressBarColor(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />}
                { !hideButtons &&
                (<Stack direction="horizontal" gap={2} className="d-flex justify-content-end mt-4">
                    <Button onClick={onAddExpenseClick} variant="outline-primary">Add Expense</Button>
                    <Button onClick={onViewExpenseClick} variant="outline-secondary">View Expenses</Button>
                </Stack>)}

            </Card.Body>
        </Card>
    </div>
  )
}

export default BudgetCard