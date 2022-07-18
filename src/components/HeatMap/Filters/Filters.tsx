import { Typeahead } from "react-bootstrap-typeahead";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

import "./Filters.css";

interface Props {
  onRangeChange: (value: string) => void;
  onFilterChange: (
    selectedGenes: any[] | undefined,
    selectedDiagnosis: any[] | undefined,
    range: string
  ) => void;
  geneOptions: string[];
  diagnosisOptions: string[];
}

const Filters = (props: Props): JSX.Element => {
  const geneOptions = props.geneOptions,
    diagnosisOptions = props.diagnosisOptions;

  const [geneSelection, setGeneSelection] = useState<any[]>([]);
  const [diagnosisSelection, setDiagnosisSelection] = useState<any[]>([]);
  const [rangeSelection, setRangeSelection] = useState<string>("100");

  return (
    <Container className="mb-4">
      <Row>
        <Form>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group style={{ marginTop: "20px" }}>
                <Form.Label>Genes</Form.Label>
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={(selected) => {
                    props.onFilterChange(
                      selected,
                      diagnosisSelection,
                      rangeSelection
                    );
                    setGeneSelection(selected);
                  }}
                  options={geneOptions}
                  placeholder="Select a list of genes..."
                  selected={geneSelection}
                  multiple
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group style={{ marginTop: "20px" }}>
                <Form.Label>Diagnosis</Form.Label>
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={(selected) => {
                    props.onFilterChange(
                      geneSelection,
                      selected,
                      rangeSelection
                    );
                    setDiagnosisSelection(selected);
                  }}
                  options={diagnosisOptions}
                  placeholder="Select a list of diagnosis..."
                  selected={diagnosisSelection}
                  multiple
                  className="Filters__Diagnosis"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Label>
                Filter top <b>{rangeSelection}%</b> of the genes that have the
                highest expression
              </Form.Label>
              <Form.Range
                step={10}
                onChange={(e) => {
                  let value = e.target.value;

                  props.onFilterChange(
                    geneSelection,
                    diagnosisSelection,
                    value
                  );
                  setRangeSelection(value);
                }}
                value={rangeSelection}
              />
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default Filters;
