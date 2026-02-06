import { Page, Document, StyleSheet, View } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import PDFHeader from './PDFHeader';
import PDFLeftSide from './PDFLeftSide';
import PDFRightSide from './PDFRightSide';

interface ResumePDFProps {
  resumeData: ResumeData;
  sectionVisibility: Record<string, boolean>;
  layoutMode: 'full-width' | 'two-column' | 'three-column';
}

const ResumePDF = ({ resumeData, sectionVisibility, layoutMode }: ResumePDFProps) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      backgroundColor: '#ffffff',
    },
    fullwidthLayout: {
      flexDirection: 'column',
    },
    twoColumnLayout: {
      flexDirection: 'row',
      gap: 20,
    },
    threeColumnLayout: {
      flexDirection: 'row',
      gap: 20,
    },
    leftColumn: {
      flex: layoutMode === 'three-column' ? 1 : 1,
    },
    rightColumn: {
      flex: layoutMode === 'three-column' ? 2 : 1,
    },
  });

  const getLayoutStyle = () => {
    switch (layoutMode) {
      case 'full-width':
        return styles.fullwidthLayout;
      case 'two-column':
        return styles.twoColumnLayout;
      case 'three-column':
      default:
        return styles.threeColumnLayout;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader resumeData={resumeData} />
        <View style={getLayoutStyle()}>
          <View style={styles.leftColumn}>
            <PDFLeftSide resumeData={resumeData} sectionVisibility={sectionVisibility} />
          </View>
          <View style={styles.rightColumn}>
            <PDFRightSide resumeData={resumeData} sectionVisibility={sectionVisibility} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;