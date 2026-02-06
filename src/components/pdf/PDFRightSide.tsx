import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

interface PDFRightSideProps {
  resumeData: ResumeData;
  sectionVisibility: Record<string, boolean>;
}

const PDFRightSide = ({ resumeData, sectionVisibility }: PDFRightSideProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (dateStr.toLowerCase() === 'current' || date.toString() === 'Invalid Date') {
      return 'Present';
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const styles = StyleSheet.create({
    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#d1d5db',
    },
    content: {
      fontSize: 10,
      marginBottom: 3,
      lineHeight: 1.4,
    },
    bold: {
      fontWeight: 'bold',
    },
    item: {
      marginBottom: 8,
    },
    list: {
      paddingLeft: 14,
    },
    listItem: {
      marginBottom: 2,
    },
  });

  return (
    <View>
      {sectionVisibility.workExperience && resumeData.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {resumeData.workExperience.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.content, styles.bold]}>{item.company}</Text>
                <Text style={styles.content}>{formatDate(item.startYear)} — {formatDate(item.endYear)}</Text>
              </View>
              <Text style={styles.content}>{item.position}</Text>
              {item.description && <Text style={styles.content}>{item.description}</Text>}
              {item.keyAchievements && (
                <View style={styles.list}>
                  {item.keyAchievements.split('\n').map((achievement, subIndex) => (
                    achievement.trim() && (
                      <Text key={subIndex} style={[styles.content, styles.listItem]}>
                        • {achievement}
                      </Text>
                    )
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {sectionVisibility.projects && resumeData.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resumeData.projects.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.content, styles.bold]}>{item.name}</Text>
                <Text style={styles.content}>{formatDate(item.startYear)} — {formatDate(item.endYear)}</Text>
              </View>
              {item.link && <Text style={styles.content}>{item.link}</Text>}
              {item.description && <Text style={styles.content}>{item.description}</Text>}
              {item.keyAchievements && (
                <View style={styles.list}>
                  {item.keyAchievements.split('\n').map((achievement, subIndex) => (
                    achievement.trim() && (
                      <Text key={subIndex} style={[styles.content, styles.listItem]}>
                        • {achievement}
                      </Text>
                    )
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PDFRightSide;